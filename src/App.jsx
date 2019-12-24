import React from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { SliderRail, Handle, Track } from './components'; // example render components - source below

import './App.scss';

const sliderStyle = {
  position: 'relative',
  width: '100%',
	touchAction: 'none',
	color: 'red',
	backgroundColor: 'red',
}

const domain = [100, 1000]
const domain2 = [1, 12]
const defaultValues = [1]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			summValue: 100,
			monthValue: 1,
			exchangeRate: 2.1,
			loanRate: 0.16/12,
			paymentUSD: 0,
			paymentBLR: 0,
			values: defaultValues.slice(),
			update: defaultValues.slice(),
		};
		this.handleChangeSumm = this.handleChangeSumm.bind(this);
		this.handleChangeMonth = this.handleChangeMonth.bind(this);
	}

	handleChangeSumm = summValue => {
    this.setState({ summValue })
	}
	
	handleChangeMonth = monthValue => {
    this.setState({ monthValue })
  }

	payment() {
		let a = Math.pow(1+this.state.loanRate,this.state.monthValue);
		this.state.paymentUSD = (this.state.summValue*this.state.loanRate*a/(a-1)).toFixed(1);
		this.state.paymentBLR = (this.state.paymentUSD*this.state.exchangeRate).toFixed(1);
	}

	getExchangeRates = async() => {
		const response = await fetch(`http://www.nbrb.by/API/ExRates/Rates/145`);
		const data = await response.json();
		this.state.exchangeRate = data.Cur_OfficialRate;
	}
	
  render() {
		this.getExchangeRates();
		this.payment();

		return (
			<div className='App'>
			<div className='App-calc'>
				<div className='range'>
					<p>Сумма кредита ($)</p>
					<p >{this.state.summValue}</p>
				</div>

        <Slider
          mode={1}
          step={100}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.handleChangeSumm}
          onChange={this.handleChangeSumm}
          values={this.state.values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
										key={handle.id}
										domain={domain}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>

				<div className='range'>
					<p>Количество месяцев</p>
					<p>{this.state.monthValue}</p>
				</div>

				<Slider
          mode={1}
          step={1}
          domain={domain2}
          rootStyle={sliderStyle}
          onUpdate={this.handleChangeMonth}
          onChange={this.handleChangeMonth}
          values={this.state.values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
										key={handle.id}
										domain={domain}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
				<div className='range'>
					<p className='return'>К возврату: <span>{this.state.paymentUSD} $</span> <span>({this.state.paymentBLR} бел. руб.)</span></p>
				</div>
			</div>
		</div>
		)
	}
}

export default App;
