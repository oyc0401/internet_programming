package com.oyc0401.inhaTravel.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "stages")
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private int number;

    private String name;

    private int star1;
    private int star2;
    private int star3;

    @Column(length = 10000)
    private String map;


}
