package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import dev.jonathanguitar.Guitar.API.Repositories.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CredentialService {
    @Autowired
    private CredentialRepository credentialRepository;

    // CREATE ------------------------------------------------------------------------------------------------
    public Credential addNewCredential(Credential credential) {
        return credentialRepository.save(credential);
    }

    // READ   ------------------------------------------------------------------------------------------------
    public Integer loginToGetUserId(String username, String password){
        Integer userId = 0;

        List<Credential> credentialList = credentialRepository.findAll();

        for(Credential credential: credentialList){
            if(credential.getUsername().equals(username) && credential.getPassword().equals(password)){
                userId=credential.getUserId();
            }
        }
        System.out.println("----userId:" + userId);

        return userId;
    }
    public Credential findByUsername(String username) {
        return credentialRepository.findByUsername(username);
    }

    public Optional<Credential> findById(Integer id) {
        return credentialRepository.findById(id);
    }

    public String giveUsername(Integer userId) {
        Credential credential = credentialRepository.getReferenceById(userId);
        return credential.getUsername();
    }

    public List<String> getAllUsernames() {
        List<Credential> credentialList = credentialRepository.findAll();
        List<String> usernameList = new ArrayList<>();

        for (Credential credential : credentialList) {
            usernameList.add(credential.getUsername());
        }
        return usernameList;
    }

    // UPDATE ------------------------------------------------------------------------------------------------

    public boolean checkUsername(String newUsername) {
        boolean unique = true;
        List<String> usernameList = getAllUsernames();

        for (String username : usernameList) {
            if (username.equals(newUsername)) {
                unique = false;
                break;
            }
        }
        if (unique) {
            System.out.println("username is unique: " + newUsername);
        } else {
            System.out.println("username is NOT unique: " + newUsername);
        }

        return unique;
    }

    public Credential updateUsername(Integer id, String newUsername) {
        Credential credential = credentialRepository.getReferenceById(id);
        credential.setUsername(newUsername);

        return credentialRepository.save(credential);
    }

    public Credential updatePassword(Integer id, String newPassword) {
        Credential credential = credentialRepository.getReferenceById(id);
        credential.setPassword(newPassword);

        return credentialRepository.save(credential);
    }
    // DELETE ------------------------------------------------------------------------------------------------


}
