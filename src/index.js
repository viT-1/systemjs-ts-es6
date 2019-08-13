import Greeter from '@common/Greeter';

(function index() {
	console.log('index is Ok!');

	const gr = new Greeter('world');
	console.log(gr.greet());
}());
