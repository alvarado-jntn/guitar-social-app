package dev.jonathanguitar.Guitar.API.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posts")
@Data // Automatically creates getters and setters
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    // Instance Variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId;
    private String title;
    private String postDate;
    private String body;
    private String imageLink;
    private Integer likesCount;
    private Integer userId;
}
