package dev.jonathanguitar.Guitar.API.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "users")
@Data //This automatically generates getters and setters
@AllArgsConstructor
@NoArgsConstructor

public class User {
    //Instance Variables

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<Post> postSet;

    @OneToMany(mappedBy = "user")
    private Set<PostComment> postCommentSet;

}
