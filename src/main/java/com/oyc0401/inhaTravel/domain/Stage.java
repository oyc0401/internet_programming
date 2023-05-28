package com.oyc0401.inhaTravel.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "stages")
public class Stage {
    @Id
    private Long id;
    private int star1;
    private int star2;
    private int star3;
    private String name;

    @Column(length = 10000)
    private String map;


}
