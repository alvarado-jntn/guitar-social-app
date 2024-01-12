package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, Integer> {
    Credential findByUsername(String username);
}
