const API_TOKEN = "249f45b1636a8156fa9fc3803fd77a82"

export function getFilmFromApiWithSearchedText(text) {
	const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=fr&query=' + text
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error))
		
}
