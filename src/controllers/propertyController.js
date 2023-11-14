const formProperty = (req, res) => {
    res.render('properties/create.pug',{
        page:'New property',
        showHeader: true
    });
}

export { formProperty }