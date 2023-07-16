const Joi = require('joi');

const validatorCreateBidang = Joi.object({
    Id_Bidang: Joi.string().length(2).required(),
    NamaBidang: Joi.string().max(75).required(),
    Created_at: Joi.date()
})

const validatorUserLogin = Joi.object({
    Id_User: Joi.string().length(7).required(),
    Email: Joi.string().max(50).email().required(),
    Username: Joi.string().min(5).max(23).required(),
    Password: Joi.string().min(6).max(100).required(),
    Token: Joi.string().max(750).required(),
    Created_at: Joi.date().required(),
    Modified_at: Joi.date()
})


const validatorUsername = Joi.string()
    .alphanum()
    .regex(/[0-9]/)
    .required();


const ValidateDataPegawai = Joi.object({
    Id_Pegawai: Joi.string().length(5).required(),
    NamaLengkap: Joi.string().max(75).required(),
    Tanggal: Joi.date().required(),
    Umur: Joi.string().max(3).required(),
    AlamatLengkap: Joi.string().max(150).required(),
    Keahlian: Joi.string().max(74).allow(null),
    LevelPekerjaan: Joi.string().max(50).allow(null),
    Kd_Provinsi: Joi.string().max(2).required(),
    Kd_KotaKabupaten: Joi.string().max(4).required(),
    Kodepos: Joi.string().max(5).required(),
    Created_at: Joi.date().required()
})

const validateSertifikasi = Joi.object({
    Id_Sertifikasi: Joi.string().length(4).required(),
    Id_Pegawai: Joi.string().length(5).required(),
    NamaLembaga: Joi.string().max(75).required(),
    Id_Bidang: Joi.string().length(2).required(),
    DokumentasiSertifikat: Joi.string().required(),
    Created_at: Joi.date().required()
})




module.exports = {
    validatorCreateBidang,
    validatorUserLogin,
    validatorUsername,
    ValidateDataPegawai,
    validateSertifikasi
}