exception BadFormat {
    1: string message
}

exception NotFound {
    1: string message
}

exception BadConnection {
    1: string message
}

service ConverterSvc {
    string convert_func(1: i64 value, 2: string unitsStr)
        throws (1: BadFormat bf, 2: NotFound nf, 3: BadConnection bc),
}
