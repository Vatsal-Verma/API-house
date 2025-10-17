package com.api_house.api_house;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
// @Entity
public class ApiEntity {
    @Id
    private int id;
    private String name;
}
