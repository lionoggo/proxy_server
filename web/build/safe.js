function init(React){
	var Safe = React.createClass({displayName: "Safe",
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
				React.createElement("div", null, 
					React.createElement("h4", {className: "subTitle"}, "安全工具"), 
					React.createElement("div", null, 
						React.createElement("h4", {className: "subTitle"}, "XXTEA"), 
						React.createElement("div", {className: "keySection"}, 
							React.createElement("div", {className: "uk-form"}, 
								React.createElement("input", {className: "uk-form-large", ref: "safe_input", onChange: self.setSafeKey, type: "text", placeholder: "请输入密钥", value: this.state.safeKey, width: "300"})
							), 
							React.createElement("br", null)
						), 

						React.createElement("div", {className: "encryptSection"}, 
							React.createElement("div", {className: "uk-form"}, 
								React.createElement("input", {className: "uk-form-large", type: "text", onChange: self.setEncryptInput, placeholder: "请输入需要加密的内容", width: "300"}), 
								React.createElement("button", {type: "button", className: "uk-button", onClick: self.clickEncrypt}, "执行加密")

							), 
							React.createElement("br", null)
						), 

					React.createElement("div", {className: "decryptSection"}, 
							React.createElement("div", {className: "uk-form"}, 
								React.createElement("input", {className: "uk-form-large", type: "text", onChange: self.setDecryptInput, placeholder: "请输入需要解密的内容", width: "300"}), 
								React.createElement("button", {type: "button", className: "uk-button", onClick: self.clickDecrypt}, "执行解密")

							), 
							React.createElement("br", null)
						), 

						React.createElement("div", {className: "resultSection", class: "uk-form-controls"}, 
							React.createElement("textarea", {ref: "dd", cols: "60", rows: "6", placeholder: "输出结果", value: this.state.resultData})
						), 

						React.createElement("h4", {className: "subTitle"}, "BASE 64"), 

						React.createElement("div", {className: "base64", class: "uk-form-controls"}, 
							React.createElement("input", {className: "uk-form-large", type: "text", placeholder: "内容", width: "300"})
						)

					)


				)
			);
		},
		componentDidMount:function(){//渲染后执行
			this.setFocus();
		}
	});

	return Safe;
}

module.exports.init = init;