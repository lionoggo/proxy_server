require("../lib/jstree");

function init(React){
	var MapForm = require("./mapForm").init(React),
		MapList = require("./mapList").init(React);

	var MapPanel = React.createClass({
		appendRecord : function(data){
			var self          = this,
				listComponent = self.refs.list;
			
			listComponent.appendRecord(data);
		},
		
		render:function(){
			var self = this;
			return (
				<div className="mapWrapper">
					<h4 className="subTitle">当前配置</h4>
					<MapList ref="list" onChange={self.props.onChange}/>
					
					<h4 className="subTitle">添加映射规则</h4>
					<MapForm onSubmit={self.appendRecord}/>
				</div>
			);
		}
	});

	return MapPanel;
}

module.exports.init = init;
module.exports.fetchConfig = require("./mapList").fetchConfig;