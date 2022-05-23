import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
    const [number, setNumber] = React.useState(0);
    const [text, setText] = React.useState('');
    const token = document.head.querySelector('meta[name="csrf-token"]').content;

    useEffect(() => {
        fetch('/api/index', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setText(data.text);
            });
    },[]);

    if(text === ''){
        return (<> Loading </>);
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">{text}</div>
                        <p>count: {number}</p>
                        <button className={'btn btn-primary'} onClick={() => setNumber(number + 1)}>+</button>
                        <button className={'btn btn-danger'} onClick={() => setNumber(number - 1)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
if (document.getElementById('example')) {
    ReactDOM.render(<Index/>, document.getElementById('example'));
}
