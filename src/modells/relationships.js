import user from './user.js';
import Property  from './property.js';
import Category  from './category.js';
import Price from './price.js';

Property.belongsTo(user,{
    foreigKey: 'user_ID'
}) //FOREIGN KEY

Price.hasOne(Property, {
    foreigKey: 'price_ID'
})

Category.hasOne(Property, {
    foreigKey: 'category_ID'
})


export { user, Property }