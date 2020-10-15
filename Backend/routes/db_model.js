module.exports = ((Sequelize, Model, DataTypes, sequelize, option = { force: true }) => {
    class car extends Model { }
    car.init({
        car_id: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        recipt_id: { type: DataTypes.STRING },
        product_id: { type: Sequelize.STRING },
        product_name: { type: DataTypes.STRING }
    }, { sequelize });
    class question extends Model { }
    question.init({
        recipt_id: { type: Sequelize.STRING },
        product_id: { type: Sequelize.STRING },
        questioner_name: { type: DataTypes.STRING },
        question: { type: DataTypes.TEXT },
        question_tag: { type: DataTypes.STRING },
        replyer_name: { type: DataTypes.STRING }, 
        reply: { type: DataTypes.TEXT },
        reply_tag: { type: DataTypes.STRING },
	solve: { type: DataTypes.BOOLEAN },
	solve_tag: { type: DataTypes.STRING }
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
