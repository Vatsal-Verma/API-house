package com.api_house.api_house;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

@Service
public class ApiService {

    private static final Logger LOGGER = Logger.getLogger(ApiService.class.getName());
    private final ObjectMapper mapper = new ObjectMapper();
    private final Random random = new Random();
    private List<String> boysNames = Collections.emptyList();
    private List<String> girlsNames = Collections.emptyList();

    @PostConstruct
    public void init() {
        try {
            boysNames = mapper.readValue(new ClassPathResource("names.json").getInputStream(), new TypeReference<List<String>>() {});
            girlsNames = mapper.readValue(new ClassPathResource("girls-name.json").getInputStream(), new TypeReference<List<String>>() {});
            LOGGER.info("Successfully loaded names from JSON files.");
        } catch (IOException e) {
            LOGGER.severe("Failed to load JSON files: " + e.getMessage());
            // Continue with empty lists to avoid breaking the app
        }
    }

    public List<String> getAllBoys() {
        if (boysNames.isEmpty()) {
            LOGGER.warning("Boys names list is empty, possibly due to earlier loading failure.");
        }
        return boysNames;
    }

    public List<String> getAllGirls() {
        if (girlsNames.isEmpty()) {
            LOGGER.warning("Girls names list is empty, possibly due to earlier loading failure.");
        }
        return girlsNames;
    }

    public String getRandomName() {
        if (girlsNames.isEmpty()) {
            LOGGER.warning("Girls names list is empty, returning default value.");
            return "No names available";
        }
        return girlsNames.get(random.nextInt(girlsNames.size()));
    }
}
