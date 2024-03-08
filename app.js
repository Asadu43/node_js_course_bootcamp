const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
const port = 3000;

// const tours = fs.readFileSync(`${__dirname}\dev-data\data\tours-sample.json`);
const tours = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data/tours-simple.json', 'utf8')
);

const getTours = (req, res) => {
  res.status(200).json({ status: 'OK', data: tours });
};

const getTour = function (req, res) {
  const id = req.params.id * 1; // convert the id parameter to a number

  if (id > tours.length) {
    // if the id is greater than the length of the tours array, return a 404 NOT FOUND error
    res.status(404).json({ status: 'NOT FOUND' });
    return;
  } else {
    // find the tour with the given id
    const tour = tours.find((tour) => tour.id === id);

    res.status(200).json({ status: 'OK', data: tour }); // return a 200 OK response with the tour data
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newtour = Object.assign({ id: newId }, req.body);
  tours.push(newtour);

  fs.writeFileSync(
    __dirname + '/dev-data/data/tours-simple.json',
    JSON.stringify(tours)
  );

  res.status(200).json({ status: 'OK', data: newtour });
};

const updateTour = function (req, res) {
  const id = req.params.id * 1; // convert the id parameter to a number

  if (id > tours.length) {
    // if the id is greater than the length of the tours array, return a 404 NOT FOUND error
    res.status(404).json({ status: 'NOT FOUND' });
    return;
  } else {
    res.status(200).json({ status: 'OK', data: '<Update Successfully>' }); // return a 200 OK response with the tour data
  }
};

const deleteTour = function (req, res) {
  const id = req.params.id * 1; // convert the id parameter to a number

  if (id > tours.length) {
    // if the id is greater than the length of the tours array, return a 404 NOT FOUND error
    res.status(404).json({ status: 'NOT FOUND' });
    return;
  } else {
    res.status(200).json({ status: 'OK', data: null }); // return a 200 OK response with the tour data
  }
};

// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

app.route('/api/v1/tours').get(getTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  /**
   * This is an asynchronous function that is called when the server starts listening
   * @param {Error} err - An error object if any
   */
  console.log(`App is listening on port ${port}`);
});
