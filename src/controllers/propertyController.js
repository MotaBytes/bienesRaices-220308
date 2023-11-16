const formProperty = (req, res) => {
    res.render('properties/create.pug',{
        page:'New property',
        showHeader: true
    });
}

//*ESTO ES EL INTENTO VAGO DEL RETO
const viewProfile = (req, res) => {
    res.send('Hola, soy tu perfil')
}

const seeProperties = (req, res) => {
    res.send('Soy tus propiedades')
}

export { formProperty, viewProfile, seeProperties }