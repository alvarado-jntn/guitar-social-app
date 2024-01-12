package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import dev.jonathanguitar.Guitar.API.Repositories.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Credential findByUsername(String username) {
        return credentialRepository.findByUsername(username);
    }

    public Optional<Credential> findById(Integer id) {
        return credentialRepository.findById(id);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
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
