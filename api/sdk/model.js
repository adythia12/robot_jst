const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x = data[1] 
    y = data[2] 
    z = data[3]
    return [x, y, z]
}

function denormalized(data){
    m1 = data[1] 
    m2 = data[2] 
    m3 = data[3]
    return [m1, m2, m3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/adythia12/bot.sjt/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
