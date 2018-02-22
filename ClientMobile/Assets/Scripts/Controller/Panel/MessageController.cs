using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;
using System;

public class MessageController : PanelController {

	public Network network;

	public Image nextPlayer;
	public Image lastPlayer;

	public GameObject ButtonNo;
	public GameObject ButtonEdit;
	public GameObject ButtonSend;
	public GameObject ButtonOk;

	public Image color;
	public Text pseudo;
	public GameObject resources;

	public Image colorPlayer1;
	public Text pseudoPlayer1;
	public GameObject resourcesPlayer1;

	public Image colorPlayer2;
	public Text pseudoPlayer2;
	public GameObject resourcesPlayer2;

	private Message msg;
	private int pos;
	private MessageEnum state;

	public override void initialize() {
		this.color.color = Player.CurrentPlayer.getColor();
		this.pseudo.text = Player.CurrentPlayer.Pseudo;

		this.colorPlayer1.color = Player.CurrentPlayer.getColor();
		this.pseudoPlayer1.text = Player.CurrentPlayer.Pseudo;

		if (!this.initialized) {
			this.pos = 0;
		}
		this.msg = Session.Messages [this.pos];
		this.msg.isSaw = true;
		this.state = this.msg.state;
		updateMessage ();
		if (!this.initialized) {
			this.initialized = true;
			updateButton ();
		}
		updateState ();
	}

	void Update() {
		updateMessage ();
		updateState ();
	}

	private void updateMessage() {
		this.resources.transform.Find ("KyberR/Text").GetComponent<Text>().text = (Player.CurrentPlayer.Resources[ResourcesEnum.RED_CRYSTAL_KYBER]
			- Session.CurrentSession.giveDepencyResources(ResourcesEnum.RED_CRYSTAL_KYBER)).ToString();
		this.resources.transform.Find ("KyberG/Text").GetComponent<Text>().text = (Player.CurrentPlayer.Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER]
			- Session.CurrentSession.giveDepencyResources(ResourcesEnum.GREEN_CRYSTAL_KYBER)).ToString();
		this.resources.transform.Find ("KyberB/Text").GetComponent<Text>().text = (Player.CurrentPlayer.Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER]
			- Session.CurrentSession.giveDepencyResources(ResourcesEnum.BLUE_CRYSTAL_KYBER)).ToString();
		this.resources.transform.Find ("KyberV/Text").GetComponent<Text>().text = (Player.CurrentPlayer.Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER]
			- Session.CurrentSession.giveDepencyResources(ResourcesEnum.VIOLET_CRYSTAL_KYBER)).ToString();

		this.resourcesPlayer1.transform.Find ("KyberR/Text").GetComponent<Text>().text = this.msg.resourcesOwn[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer1.transform.Find ("KyberG/Text").GetComponent<Text>().text = this.msg.resourcesOwn[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer1.transform.Find ("KyberB/Text").GetComponent<Text>().text = this.msg.resourcesOwn[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer1.transform.Find ("KyberV/Text").GetComponent<Text>().text = this.msg.resourcesOwn[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();

		this.colorPlayer2.color = Session.CurrentSession.getPlayerById (this.msg.idPlayer).getColor();
		this.pseudoPlayer2.text = Session.CurrentSession.getPlayerById (this.msg.idPlayer).Pseudo;
		this.resourcesPlayer2.transform.Find ("KyberR/Text").GetComponent<Text>().text = this.msg.resourcesPlayer[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer2.transform.Find ("KyberG/Text").GetComponent<Text>().text = this.msg.resourcesPlayer[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer2.transform.Find ("KyberB/Text").GetComponent<Text>().text = this.msg.resourcesPlayer[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		this.resourcesPlayer2.transform.Find ("KyberV/Text").GetComponent<Text>().text = this.msg.resourcesPlayer[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();
	
		int nextId = Session.Messages [(this.pos + 1) % Session.Messages.Count].idPlayer;
		this.nextPlayer.color = Session.CurrentSession.getPlayerById (nextId).getColor();
		int lastId = Session.Messages [(this.pos + Session.Messages.Count - 1) % Session.Messages.Count].idPlayer;
		this.lastPlayer.color = Session.CurrentSession.getPlayerById (lastId).getColor();
	}

	private void updateButton() {
		foreach (ResourcesEnum resource in Enum.GetValues(typeof(ResourcesEnum))) {
			if (ResourcesEnum.NO_RESOURCE != resource) {
				this.resourcesPlayer1.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonTop").GetComponent<Button> ().onClick.AddListener (delegate {
					if(Player.CurrentPlayer.Resources[resource] - Session.CurrentSession.giveDepencyResources(resource) > 0)
						this.msg.resourcesOwn [resource]++;
				});
				this.resourcesPlayer1.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonBot").GetComponent<Button> ().onClick.AddListener (delegate {
					if(0 < this.msg.resourcesOwn [resource])
						this.msg.resourcesOwn [resource]--;
				});
				this.resourcesPlayer2.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonTop").GetComponent<Button> ().onClick.AddListener (delegate {
					if(25 > this.msg.resourcesPlayer [resource])
						this.msg.resourcesPlayer [resource]++;
				});
				this.resourcesPlayer2.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonBot").GetComponent<Button> ().onClick.AddListener (delegate {
					if(0 < this.msg.resourcesPlayer [resource])
						this.msg.resourcesPlayer [resource]--;
				});
			}
		}
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.GAME);
	}

	public void next() {
		this.pos = (this.pos + 1) % Session.Messages.Count;
		this.msg = Session.Messages [this.pos];
		this.msg.isSaw = true;
	}

	public void last() {
		this.pos = (this.pos + Session.Messages.Count - 1) % Session.Messages.Count;
		this.msg = Session.Messages [this.pos];
		this.msg.isSaw = true;
	}

	public void updateState() {
		this.state = this.msg.state;
		switch(state) {
		case MessageEnum.EDIT:
			this.ButtonEdit.SetActive (false);
			this.ButtonSend.SetActive (true);
			this.ButtonOk.SetActive (false);
			this.ButtonNo.SetActive (false);
			setActiveButton (true);
			break;
		case MessageEnum.SEND:
			this.ButtonEdit.SetActive (true);
			this.ButtonSend.SetActive (false);
			this.ButtonOk.SetActive (false);
			this.ButtonNo.SetActive (false);
			setActiveButton (false);
			break;
		case MessageEnum.RECIEVE:
			this.ButtonEdit.SetActive (true);
			this.ButtonSend.SetActive (false);
			this.ButtonOk.SetActive (true);
			this.ButtonNo.SetActive (true);
			setActiveButton (false);
			break;
		}
	}

	private void setActiveButton(bool b) {
		foreach (ResourcesEnum resource in Enum.GetValues(typeof(ResourcesEnum))) {
			if (ResourcesEnum.NO_RESOURCE != resource) {
				this.resourcesPlayer1.transform.Find ("Kyber" + ResourcesEnumHelper.ToInitial (resource) + "/ButtonTop").gameObject.SetActive (b);
				this.resourcesPlayer1.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonBot").gameObject.SetActive (b);
				this.resourcesPlayer2.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonTop").gameObject.SetActive (b);
				this.resourcesPlayer2.transform.Find ("Kyber"+ ResourcesEnumHelper.ToInitial(resource) + "/ButtonBot").gameObject.SetActive (b);
			}
		}
	}

	public void validate() {
		this.msg.state = MessageEnum.SEND;
		this.network.editChange (this.msg);
	}

	public void accept() {
		if(canPay()) {
			this.msg.state = MessageEnum.SEND;
			this.network.acceptChange (this.msg);
			Session.Messages [this.pos].reset ();
			this.msg = Session.Messages [this.pos];
		} else {
			this.panelManager.showError (true, "Attention ! Vous n'avez pas assez de ressources pour accepter cette échange.");
		}
	}

	private bool canPay() {
		foreach (ResourcesEnum resource in Enum.GetValues(typeof(ResourcesEnum))) {
			if (ResourcesEnum.NO_RESOURCE != resource) {
				if (this.msg.resourcesOwn [resource] >
					Player.CurrentPlayer.Resources [resource] - Session.CurrentSession.giveDepencyResources (resource)) {
					return false;
				}
			}
		}
		return true;
	}

	public void refuse() {
		this.msg.state = MessageEnum.SEND;
		this.network.refuseChange (this.msg);
		Session.Messages [this.pos].reset ();
		this.msg = Session.Messages [this.pos];
	}

	public void edit() {
		this.msg.state = MessageEnum.EDIT;
	}

	public void recieve() {
		this.msg.state = MessageEnum.RECIEVE;
	}
}