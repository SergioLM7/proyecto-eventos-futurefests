const authControllers = require('../controllers/auth.controllers');
const express = require("express");
const passport = require("passport");
const router = require('express').Router();

router.post('/login/user', authControllers.login)

//router.get("/signin", authControllers.googleAuth);

router.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));

router.get("/google/callBack", 
    passport.authenticate('google', { failureRedirect: '/auth/failure' }), 
    authControllers.googleCallback
);

//router.get("/login", authControllers.dashboard);

router.get('/auth/failure', authControllers.authFailure);

//router.get('/logout', authControllers.logout);


module.exports = router;
