
const express = require('express');
const app = express();
app.use(express.json());
require('./db')
app.use(require('./app'));
const PORT=process.env.PORT || 5000;






if (process.env.NODE_ENV ==='‘production' ) {
    app.use(express.static('./client/build'));
    const path=require('path');
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'client', 'build','index.html'));
    });
   }
app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);

})