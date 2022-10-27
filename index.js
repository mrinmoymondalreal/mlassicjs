const { Mlassic } = require("./dom");
const { useState, useEffect } = require("./hooks");
const { render } = require("./renderer");

module.exports = window["mlassicjs"] = {
    Mlassic,
    render,
    useState,
    useEffect
}