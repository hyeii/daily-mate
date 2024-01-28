package com.dailymate.global.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.dailymate.global.image.exception.ImageBadRequestException;
import com.dailymate.global.image.exception.ImageExceptionMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Override
    public String uploadImage(MultipartFile image) {

        if(image.isEmpty()){
            throw new ImageBadRequestException("[uploadImage]" + ImageExceptionMessage.IMAGE_BAD_REQUEST);
        }


        return null;
    }

    @Override
    public void deleteImage(String imageUrl) {

    }

    /**
     * UUID 파일명 반환
     * @param fileName
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
