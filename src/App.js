import React,{Component} from 'react';
import $ from 'jquery'
import '../src/css/pure-min.css';
import '../src/css/side-menu.css';

class App extends Component{

constructor(){
super()
this.state = {lista:[],nome:'',email:'',senha:''}
this.enviaForm = this.enviaForm.bind(this)
this.setNome = this.setNome.bind(this)
this.setEmail = this.setEmail.bind(this)
this.setSenha = this.setSenha.bind(this)
}


componentDidMount(){
 this.carregarLista()
}

carregarLista(){
  $.ajax({
    url:`http://cdc-react.herokuapp.com/api/autores`,
    dataType:'json',
    success:function(resposta){
      this.setState({lista:resposta})
    }.bind(this)
  })

}

enviaForm(evento){
  evento.preventDefault()
  $.ajax({
    url:'http://cdc-react.herokuapp.com/api/autores',
    contentType:'aplication/json',
    dataType:'json',
    type:'post',
    data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
    success: function(resposta){
        this.setState({lista:resposta})
    
    }.bind(this),
    error: function(resposta){
      console.log('erro...')
    }
  })

}

setNome(evento){
this.setState({nome:evento.target.nome})
}

setEmail(evento){
this.setState({email:evento.target.email})
}

setSenha(evento){
this.setState({senha:evento.target.senha})
}



  render(){

    return(
      <div id="layout">
    
      <a href="#menu" id="menuLink" className="menu-link">
          
          <span></span>
      </a>
  
      <div id="menu">
          <div className="pure-menu">
              <a className="pure-menu-heading" href="/index">Company</a>
  
              <ul className="pure-menu-list">
                  <li className="pure-menu-item"><a href="/Home" className="pure-menu-link">Home</a></li>
                  <li className="pure-menu-item"><a href="/Autor" className="pure-menu-link">Autor</a></li>
                  <li className="pure-menu-item"><a href="/Livro" className="pure-menu-link">Livro</a></li>
  
                  
              </ul>
          </div>
      </div>
  
          <div id="main">
              <div className="header">
                <h1>Cadastro de Autores</h1>
              </div>
              <div className="content" id="content">
                <div className="pure-form pure-form-aligned">
                  <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <div className="pure-control-group">
                      <label htmlFor="nome">Nome</label> 
                      <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />                  
                    </div>
                    <div className="pure-control-group">
                      <label htmlFor="email">Email</label> 
                      <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />                  
                    </div>
                    <div className="pure-control-group">
                      <label htmlFor="senha">Senha</label> 
                      <input id="senha" type="password" name={this.state.senha} onChange={this.setSenha}  />                                      
                    </div>
                    <div className="pure-control-group">                                  
                      <label></label> 
                      <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                  </form>             
  
                </div>  
                <div>            
                  <table className="pure-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>email</th>
                      </tr>
                    </thead>
                    <tbody>
                     {
                       this.state.lista.map((item)=>{
                         return(
                           <tr key={item.id}>
                             <td>{item.nome}</td>
                             <td>{item.email}</td>
                           </tr>
                         )
                       })
                     }
                    </tbody>
                  </table> 
                </div>             
              </div>
            </div>            
  
  
  </div>     
    )
  }



}

export default App

