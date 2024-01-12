package dev.jonathanguitar.Guitar.API.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "user_details")
@Data //Automatically Creates Getters and Setters
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    @Id
    private Integer userId;
    private String dob;
    private String description;
    private Integer guitarCount;
    private String level;
}
