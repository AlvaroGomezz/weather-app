/* Lista municipios */

export interface IMunicipios {
    CODIGOINE:                string;
    ID_REL:                   string;
    COD_GEO:                  string;
    CODPROV:                  string;
    NOMBRE_PROVINCIA:         string;
    NOMBRE:                   string;
    POBLACION_MUNI:           number;
    SUPERFICIE:               number;
    PERIMETRO:                number;
    CODIGOINE_CAPITAL:        string;
    NOMBRE_CAPITAL:           string;
    POBLACION_CAPITAL:        string;
    HOJA_MTN25:               string;
    LONGITUD_ETRS89_REGCAN95: number;
    LATITUD_ETRS89_REGCAN95:  number;
    ORIGEN_COORD:             OrigenCoord;
    ALTITUD:                  number;
    ORIGEN_ALTITUD:           OrigenAltitud;
    DISCREPANTE_INE:          number;
}


export enum OrigenAltitud {
    Mapa = "Mapa",
    Mdt5 = "MDT5",
}

export enum OrigenCoord {
    Iberpix = "IBERPIX",
    Mapa = "Mapa",
}

/* Datos del municipio */

export interface IData {
    municipio:          IMunicipio;
    fecha:              Date;
    stateSky:           StateSky;
    temperatura_actual: string;
    temperaturas:       Temperaturas;
    humedad:            string;
    viento:             string;
    lluvia:             string;
    imagen:             null;
    pronostico:         Pronostico;
    proximos_dias:      ProximosDia[];
    breadcrumb:         Breadcrumb[];
    keywords:           string;
}

export interface Breadcrumb {
    name:  string;
    url:   string;
    title: string;
}

export interface IMunicipio {
    CODIGOINE:                string;
    ID_REL:                   string;
    COD_GEO:                  string;
    CODPROV:                  string;
    NOMBRE_PROVINCIA:         string;
    NOMBRE:                   string;
    POBLACION_MUNI:           number;
    SUPERFICIE:               number;
    PERIMETRO:                number;
    CODIGOINE_CAPITAL:        string;
    NOMBRE_CAPITAL:           string;
    POBLACION_CAPITAL:        string;
    HOJA_MTN25:               string;
    LONGITUD_ETRS89_REGCAN95: number;
    LATITUD_ETRS89_REGCAN95:  number;
    ORIGEN_COORD:             string;
    ALTITUD:                  number;
    ORIGEN_ALTITUD:           string;
    DISCREPANTE_INE:          number;
}

export interface Pronostico {
    hoy:    Hoy;
    manana: Hoy;
}

export interface Hoy {
    "@attributes":      HoyAttributes;
    estado_cielo:       string[];
    precipitacion:      string[];
    prob_precipitacion: string[];
    prob_tormenta:      string[];
    nieve:              string[];
    prob_nieve:         string[];
    temperatura:        string[];
    sens_termica:       string[];
    humedad_relativa:   string[];
    viento:             VientoElement[];
    racha_max:          string[];
}

export interface HoyAttributes {
    fecha: Date;
    orto:  string;
    ocaso: string;
}

export interface VientoElement {
    "@attributes": VientoAttributes;
    direccion:     string;
    velocidad:     string;
}

export interface VientoAttributes {
    periodo: string;
}

export interface ProximosDia {
    "@attributes":      ProximosDiaAttributes;
    prob_precipitacion: string[] | string;
    cota_nieve_prov:    Array<PurpleCotaNieveProv | string> | FluffyCotaNieveProv | string;
    estado_cielo:       string[] | string;
    viento:             VientoElement[] | PurpleViento;
    racha_max:          Array<PurpleCotaNieveProv | string> | FluffyCotaNieveProv;
    temperatura:        HumedadRelativa;
    sens_termica:       HumedadRelativa;
    humedad_relativa:   HumedadRelativa;
    uv_max?:            string;
}

export interface ProximosDiaAttributes {
    fecha: Date;
}

export interface PurpleCotaNieveProv {
    "@attributes": VientoAttributes;
}

export interface FluffyCotaNieveProv {
}

export interface HumedadRelativa {
    maxima: string;
    minima: string;
    dato?:  string[];
}

export interface PurpleViento {
    direccion: string;
    velocidad: string;
}

export interface StateSky {
    description: string;
    id:          string;
}

export interface Temperaturas {
    max: string;
    min: string;
}

/* Datos para pintar la app */

export interface IWeatherData {
    municipio         : string;
    provincia         : string;
    temperaturaActual : string;
    viento            : string;
    humedad           : string;
    temperaturaMin    : string;
    temperaturaMax    : string;
    ocaso             : string;
    estadoDelCielo    : string;
    descripcion       : string;
}

export interface IImagenes {
    src   : string;
    icono : string;
}

export interface IWeatherProxDias {
    fecha           : string;
    estadoDelCielo  : string;
    temperaturaMin  : number;
    temperaturaMax  : number;
    icono           : string;
}