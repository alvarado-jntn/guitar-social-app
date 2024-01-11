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

    public Credential findByUsername(String username) {
        return credentialRepository.findByUsername(username);
    }

    public Credential addNewCredential (Credential credential) {
        return credentialRepository.save(credential);
    }
}
