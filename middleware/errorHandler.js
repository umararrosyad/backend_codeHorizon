const errorHandler = (err,req,res, next)=>{
    if(err.name === 'notFound'){
        res.status(404).json({message: 'Target Tidak Ditemukan'})
    }else if(err.name === 'invalidCaredential'){
        res.status(400).json({message: 'Username atau password salah'})
    }else if(err.name === 'nullParameter'){
        res.status(400).json({message: 'Parameter Tidak Boleh Kosong'})
    }else if(err.name === 'missAuth'){
        res.status(400).json({message: 'Authorization header missing'})
    }else if(err.name === 'fileNotFound'){
        res.status(400).json({message: 'Tidak Ada File Yang Dikirimkan'})
    }
}


module.exports = errorHandler