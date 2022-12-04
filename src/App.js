import './App.css';
import { useState } from "react"
import { connect } from "@argent/get-starknet"
import erc20Abi from "./abi/erc20_abi.json"
import whitelistPresaleAbi from "./abi/whitelistPresale_abi.json"
import { Contract } from "starknet"

const ethContractAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
const whitelistContractAddress = "0x0787394ffbae37324f14417635267909607f051a580aee93a71b4998b6dd417c"
const whitelistContractAddressInFelt = "3405109849710553724581303656748743505005861533151013043845065156189463855484"

function App() {
	const [provider, setProvider] = useState('')
	const [address, setAddress] = useState('')
	const [isConnected, setIsConnected] = useState(false)

	const connectWallet = async () => {
		try {
			const starknet = await connect()
			await starknet?.enable({ starknetVersion: "v4" })
			setProvider(starknet.account)
			setAddress(starknet.selectedAddress)
			setIsConnected(true)
		}
		catch (e) {
			alert(e.message)
		}

	}

	const approveEth = async () => {
		try {
			const ethContract = new Contract(erc20Abi, ethContractAddress, provider)
			await ethContract.approve(whitelistContractAddressInFelt, [1000000000000000, 0])
			alert("You've approved 0.01 eth")
		} catch (e) {
			alert(e.message)
		}
	}

	const register = async () => {
		try {
			const whitelistContract = new Contract(whitelistPresaleAbi, whitelistContractAddress, provider)
			await whitelistContract.register()
			alert("Registered!")
		}
		catch (e) {
			alert(e.message)
		}
	}

	const claim = async () => {
		try {
			const whitelistContract = new Contract(whitelistPresaleAbi, whitelistContractAddress, provider)
			await whitelistContract.claim();
			alert("Claimed!")
		}
		catch (e) {
			alert(e.message)
		}

	}

	return (
		<div className="App">
			<header className="App-header">
				<main className="main">
					<h1 className="title">
						Week5<a>Submittion</a>
					</h1>
					{
						isConnected ?
							<button className="connect">{address.slice(0, 5)}...{address.slice(60)}</button> :
							<button className="connect" onClick={() => connectWallet()}>Connect wallet</button>
					}
					<div className="grid">
						<div href="#" className="card">
							<p>register</p>
							<div className="cardForm">
								<button className='connect' onClick={() => approveEth()}>approve</button>
							</div>
							<div className="cardForm">
								<button className='connect' onClick={() => register()}>register</button>
							</div>
							<hr />
							<p>Claim</p>
							<div className="cardForm">
								<button className='connect' onClick={() => claim()}>claim</button>
							</div>
						</div>
					</div>
				</main>
			</header>
		</div>
	);
}

export default App;
