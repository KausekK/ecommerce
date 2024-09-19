package com.code.ecommerce.config;

import com.code.ecommerce.entity.Product;
import com.code.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] unsuportedAcctions  ={HttpMethod.POST,HttpMethod.PUT,HttpMethod.DELETE};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsuportedAcctions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsuportedAcctions));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsuportedAcctions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsuportedAcctions));
    }
}
