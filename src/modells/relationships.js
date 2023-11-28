import user from './user.js';
import Property  from './property.js';
import Category  from './category.js';
import Price from './price.js';

Property.belongsTo(user,{
    foreignKey: 'user_ID'
}) //FOREIGN KEY

Price.hasOne(Property, {
    foreignKey: 'price_ID'
})

Category.hasOne(Property, {
    foreignKey: 'category_ID'
})


export { user, Property }