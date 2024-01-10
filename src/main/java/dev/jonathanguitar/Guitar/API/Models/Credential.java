package dev.jonathanguitar.Guitar.API.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "credentials")
@Data // Automatically generates getters and setters
@AllArgsConstructor
@NoArgsConstructor
public class Credential {
    // Instance Variable
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer userID;
    private String username;
    private String password;
}
