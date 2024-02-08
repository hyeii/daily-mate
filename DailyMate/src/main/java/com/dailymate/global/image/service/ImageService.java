package com.dailymate.global.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImage(MultipartFile image);
    void deleteImage(String imageUrl);
    String getUUIDName(String fileName);
    String getFolderName();
}
