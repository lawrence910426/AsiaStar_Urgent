module.exports = ((Sequelize, Model, DataTypes, sequelize, option = { force: false }) => {
    class car extends Model { }
    car.init({
        car_id: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        recipt_id: { type: DataTypes.INTEGER },
        product_id: { type: Sequelize.INTEGER },
        product_name: { type: DataTypes.STRING }
    }, { sequelize });
    class question extends Model { }
    question.init({
        recipt_id: { type: Sequelize.INTEGER },
        product_id: { type: Sequelize.INTEGER },
        questioner_name: { type: DataTypes.STRING },
        question: { type: DataTypes.STRING },
        question_tag: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        replyer_name: { type: DataTypes.STRING }, 
        reply: { type: DataTypes.STRING },
        reply_tag: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    }, { sequelize });
    
    return {
        car: car,
        question: question,
        sync: new Promise(async (resolve, reject) => {
            try {
                await car.sync(option)
                await question.sync(option)
                resolve()
            } catch (ex) { reject(ex) }
        })
    };
});
