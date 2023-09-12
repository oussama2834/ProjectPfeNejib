package net.gestionachat.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.user.User;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
@Table(name = "demande_achat")
public class DemandeAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Date dateDemande;
    private Date dateApprobation;
    private double qteDemandee;
    private double  qteApprouvee;
    private String description;
    private String delais;
    private String etat;
    private String motifRejet;

    @ManyToOne
    @JoinColumn(name = "id_user_demandeur")
    private User userDemandeur;

    @Column(name = "id_user_approbateur")
    private User userApprouvant;

    @OneToMany(mappedBy = "demandeAchat", cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    private List<Articles> articles;

}
