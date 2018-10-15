module.exports = (err, data)=>{
  let result = {};

  if (err){
    result.status = 'ERROR';
    result.message = err.message;
    result.error = err.toString();
  }else{
    result.status = 'SUCCESS';
    result.data = data;
  }

  return result;
};
