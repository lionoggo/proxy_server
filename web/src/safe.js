function init(React){
	var Safe = React.createClass({
		getInitialState: function() {
			return {
				safeKey:"",
				encrypt_input:"",
				decrypt_input:"",
				resultData: ""
			};
		},
		setSafeKey:function() {
			this.setState({
				safeKey:event.target.value
			})
		},
		setDecryptInput:function() {
			this.setState({
				decrypt_input:event.target.value
			})
		},
		setEncryptInput:function() {
			this.setState({
				encrypt_input:event.target.value
			})
		},
		clickEncrypt:function(){
			var safeKey = this.state.safeKey;
			var value = this.state.encrypt_input;
			if(safeKey.length<=0) {
				alert("请输入解密密钥");
				return ;
			}
			if(value.length<=0) {
				alert("请输入需要加密的内容");
				return ;
			}
			$.getJSON("/encrypt", {key: safeKey, data: value}, function (err,res) {
				if (typeof res == "object") {
					this.setState({
						resultData:res.result
					})
				}
			}.bind(this))
		},
		clickDecrypt:function() {
			var safeKey = this.state.safeKey;
			var value = this.state.decrypt_input;
			if(safeKey.length<=0) {
				alert("请输入需要解密的内容");
				return ;
			}
			if(value.length<=0) {
				alert("请输入需要解密的内容");
				return ;
			}

			$.getJSON("/decrypt", {key: safeKey, data: value}, function (res) {
				if (typeof res == "object") {
					this.setState({
						resultData:res.result
					})
				}
			}.bind(this))
		},
		setFocus:function(){
			var self = this;
			//findDOMNode获取真实结点
			React.findDOMNode(self.refs.safe_input).focus();
		},
		render:function(){
			var self = this;

			return (
				<div>
					<h4 className="subTitle">安全工具</h4>
					<div>
						<h4 className="subTitle">XXTEA</h4>
						<div className="keySection">
							<div className="uk-form">
								<input className="uk-form-large" ref="safe_input" onChange={self.setSafeKey} type="text" placeholder="请输入密钥" value={this.state.safeKey} width="300"/>
							</div>
							<br/>
						</div>

						<div className="encryptSection">
							<div className="uk-form">
								<input className="uk-form-large" type="text" onChange={self.setEncryptInput} placeholder="请输入需要加密的内容" width="300"/>
								<button type="button" className="uk-button" onClick={self.clickEncrypt}>执行加密</button>

							</div>
							<br/>
						</div>

					<div className="decryptSection">
							<div className="uk-form">
								<input className="uk-form-large" type="text" onChange={self.setDecryptInput} placeholder="请输入需要解密的内容" width="300"/>
								<button type="button" className="uk-button" onClick={self.clickDecrypt}>执行解密</button>

							</div>
							<br/>
						</div>

						<div className="resultSection" class="uk-form-controls">
							<textarea ref="dd" cols="60" rows="6" placeholder="输出结果" value={this.state.resultData}></textarea>
						</div>

						<h4 className="subTitle">BASE 64</h4>

						<div className="base64" class="uk-form-controls">
							<input className="uk-form-large" type="text" placeholder="内容" width="300" />
						</div>

					</div>


				</div>
			);
		},
		componentDidMount:function(){//渲染后执行
			this.setFocus();
		}
	});

	return Safe;
}

module.exports.init = init;