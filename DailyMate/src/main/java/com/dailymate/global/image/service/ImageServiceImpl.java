package com.dailymate.global.image.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dailymate.global.image.exception.ImageBadRequestException;
import com.dailymate.global.image.exception.ImageExceptionMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageServiceImpl implements ImageService{

    /**
     * S3 버킷 이름
     */
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3 amazonS3Client;

    /**
     * S3에 파일 업로드
     * @param image MultipartFile
     * @return
     */
    @Override
    public String uploadImage(MultipartFile image) {

        if(image.isEmpty()){
            throw new ImageBadRequestException("[uploadImage]" + ImageExceptionMessage.IMAGE_BAD_REQUEST.getMsg());
        }

        // 업로드하는 파일 경로 만들기
        String uploadFilePath = getFolderName();

        // 업로드하는 파일명 만들기
        String originalFileName = image.getOriginalFilename();
        String uploadFileName = getUUIDName(originalFileName);

        // 로컬에 파일을 저장하지 않고 업로드
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(image.getContentType());
        objectMetadata.setContentLength(image.getSize());

        // ex) 년/월/일/파일명.확장자
        String keyName = uploadFilePath + "/" + uploadFileName;

        try(InputStream inputStream = image.getInputStream()){

            // 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
            amazonS3Client.putObject(
                    new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (IOException e) {
            // 파일 읽어오기 에러
            throw new ImageBadRequestException("[uploadImage]" + ImageExceptionMessage.IMAGE_FILE_IO_ERROR.getMsg());
        } catch (AmazonS3Exception e) {
            // AWS S3 서비스에서 반환한 예외 처리
            throw new ImageBadRequestException("[uploadImage]" + ImageExceptionMessage.AMAZON_S3_SERVICE_UPLOAD_ERROR.getMsg());
        } catch (AmazonClientException e) {
            // AWS S3 클라이언트에서 반환한 예외 처리
            throw new ImageBadRequestException("[uploadImage]" + ImageExceptionMessage.AMAZON_S3_CLIENT_UPLOAD_ERROR.getMsg());
        }

        return keyName;
    }

    /**
     * S3에 업로드된 파일 삭제
     * @param imageUrl String
     */
    @Override
    public void deleteImage(String imageUrl) {

        if(!StringUtils.hasText(imageUrl)) {
            throw new ImageBadRequestException("[deleteImage]" + ImageExceptionMessage.IMAGE_URL_BAD_REQUEST.getMsg());
        }

        try {
            // S3 버킷에 해당 파일 경로에 파일이 있는지 확인
            boolean isObjectExist = amazonS3Client.doesObjectExist(bucketName, imageUrl);

            if(isObjectExist){
                amazonS3Client.deleteObject(bucketName, imageUrl);
            } else {
                log.info("S3에 해당 이미지가 존재하지 않습니다. imageUrl = " + imageUrl);
            }
        } catch (AmazonS3Exception e) {
            // Amazon S3 서비스에서 반환한 예외 처리
            throw new ImageBadRequestException("[deleteImage]" + ImageExceptionMessage.AMAZON_S3_SERVICE_UPLOAD_ERROR.getMsg());
        } catch (AmazonClientException e) {
            // Amazon S3 클라이언트에서 반환한 예외 처리
            throw new ImageBadRequestException("[deleteImage]" + ImageExceptionMessage.AMAZON_S3_CLIENT_UPLOAD_ERROR.getMsg());
        }
    }

    /**
     * UUID 파일명 반환
     * @param fileName String
     * @return
     */
    @Override
    public String getUUIDName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

    /**
     * 년/월/일 폴더명 반환
     * @return
     */
    @Override
    public String getFolderName() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String folderName = sdf.format(date);
        return folderName.replace("-", "/");
    }
}
