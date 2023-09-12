import { User } from "app/core/user/user.types";
import { Article } from "app/modules/Models/Article";

export interface DemandeAchat {

    id: string;
    dateDemande: Date;
    dateApprobation: Date;
    description: string;
    qteDemandee: number;
    delais: string;
    etat: string;
    motifRejet: string;
    userDemandeur: User;
    userApprobateur:User;
    articles: Article[];
    avatar?: string;
    status?: string;
}
