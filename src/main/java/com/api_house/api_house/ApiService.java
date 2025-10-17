package com.api_house.api_house;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service 
class ApiService {

    private final ObjectMapper mapper = new ObjectMapper();
    private File boyFile = new File("src/main/resources/names.json");
    private File girlFile = new File("src/main/resources/girls-name.json");
    private final Random random = new Random();


    //this is going to read all the names from the json file
    public List<String> getAllBoys() throws IOException {
        return mapper.readValue(boyFile, new TypeReference<List<String>>() {});
    }

    public List<String> getAllGirls() throws IOException {
        return mapper.readValue(girlFile, new TypeReference<List<String>>() {});
    }


    // Get a random name from the list of names in the json file. 
    public String getRandomName() throws IOException {
        List<String> names = getAllGirls();
        return names.get(random.nextInt(names.size()));
    }
}       