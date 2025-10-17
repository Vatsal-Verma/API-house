package com.api_house.api_house;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/api")
public class Controller {
    
    @Autowired
    private ApiService apiService; 

    @GetMapping("/getAllBoys")
    public List<String> getAllBoys() throws IOException {
        return apiService.getAllBoys();
    }

    @GetMapping("/getAllGirls")
    public List<String> getAllGirls() throws IOException {
        return apiService.getAllGirls();
    }

    @GetMapping("/getRandomBoy")
    public String getRandomBoyName() throws IOException {
        return apiService.getRandomName();
    }
}
