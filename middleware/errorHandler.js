const errorHandler = (err, req, res, next) => {
  if (err.name === "notFound") {
    res.status(404).json({
      status: "error",
      message: "data Tidak Ditemukan",
      data: {}
    });
  } else if (err.name === "invalidCaredential") {
    res.status(400).json({
      status: "error",
      message: "Username atau password salah",
      data: {}
    });
  } else if (err.name === "nullParameter") {
    res.status(400).json({
      status: "error",
      message: "Parameter Tidak Boleh Kosong",
      data: {}
    });
  } else if (err.name === "missAuth") {
    res.status(400).json({
      status: "error",
      message: "Authorization header missing",
      data: {}
    });
  } else if (err.name === "fileNotFound") {
    res.status(400).json({
      status: "error",
      message: "Tidak Ada File Yang Dikirimkan",
      data: {}
    });
  } else if (err.name === "DataExist") {
    res.status(400).json({
      status: "error",
      message: "Pasangan product type dan product size sudah ada.",
      data: {}
    });
  } else if (err.name === "notFoundEndpoin") {
    res.status(400).json({
      status: "error",
      message: "Endpoint yang Anda cari tidak ada.",
      data: {}
    });
  }
};

module.exports = errorHandler;
