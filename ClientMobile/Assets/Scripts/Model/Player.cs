using System;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Player
	{
		private int id;
		private string pseudo;
		private SpeciesEnum specie;
		private ColorEnum color;
		private List<Planet> planets;
		private List<Fleet> fleets;
		private Dictionary<ResourcesEnum, int> resources;

		public int Id {
			get {
				return this.id;
			}
			set {
				this.id = value;
			}
		}

		public string Pseudo {
			get {
				return this.pseudo;
			}
			set {
				this.pseudo = value;
			}
		}

		public SpeciesEnum Specie {
			get {
				return this.specie;
			}
			set {
				this.specie = value;
			}
		}

		public List<Planet> Planets {
			get {
				return this.planets;
			}
			set {
				this.planets = value;
			}
		}

		public List<Fleet> Fleets {
			get {
				return this.fleets;
			}
			set {
				this.fleets = value;
			}
		}

		public Dictionary<ResourcesEnum, int> Resources {
			get {
				return this.resources;
			}
			set {
				this.resources = value;
			}
		}

		public Fleet getFleetById(int id) {
			foreach (Fleet fleet in fleets) {
				if (fleet.Id == id)
					return fleet;
			}
			return null;
		}

		public void setColorWithEnum(ColorEnum color) {
			this.color = color;
		}

		public void setColorWithEnum(string color) {
			this.color = ColorEnumHelper.ToEnum(color);
		}

		public ColorEnum Color {
			get {
				return this.color;
			}
			set {
				this.color = value;
			}
		}

		public string getColorString() {
			return ColorEnumHelper.ToExplicitString(this.color);
		}

		public Color32 getColor() {
			return ColorEnumHelper.GetColor(this.color);
		}

		public Player ()
		{
			new Player (0, "", ColorEnum.RED);
		}

		public Player (int id, string pseudo, ColorEnum color)
		{
			this.id = id;
			this.pseudo = pseudo;
			this.specie = SpeciesEnum.NO_SPECIE;
			this.color = color;
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();
			this.resources = new Dictionary<ResourcesEnum, int> ();
		}

		public Player (int id, string pseudo, string color)
		{
			this.id = id;
			this.pseudo = pseudo;
			this.specie = SpeciesEnum.NO_SPECIE;
			this.color = ColorEnumHelper.ToEnum(color);
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();
			this.resources = new Dictionary<ResourcesEnum, int> ();
		}

		public Player (JObject node)
		{
			this.id = (int) node["id"];
			this.pseudo = (string) node["pseudo"];
			this.specie = (SpeciesEnum) ((int) node["specie"]);
			this.color = (ColorEnum) ((int) node["color"]);
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();

			this.resources = new Dictionary<ResourcesEnum, int> ();
			JArray nodeResources = (JArray) node ["resources"];
			this.resources[ResourcesEnum.RED_CRYSTAL_KYBER] = (int) nodeResources[0];
			this.resources[ResourcesEnum.GREEN_CRYSTAL_KYBER] = (int) nodeResources[1];
			this.resources[ResourcesEnum.BLUE_CRYSTAL_KYBER] = (int) nodeResources[2];
			this.resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = (int) nodeResources[3];
		}

		public bool canPaid () {
			foreach (ResourcesEnum resource in Enum.GetValues(typeof(ResourcesEnum))) {
				if(ResourcesEnum.NO_RESOURCE != resource) {
					if (this.resources [resource] - Session.CurrentSession.giveDepencyResources(resource) < 1)
						return false;
				}
			}
			foreach (ResourcesEnum resource in Enum.GetValues(typeof(ResourcesEnum))) {
				if(ResourcesEnum.NO_RESOURCE != resource)
					this.resources [resource] -= 1;
			}
			return true;
		}


		private static Player currentPlayer;
		private static bool isInitializedCurrentPlayer = false;

		public static Player CurrentPlayer {
			get {
				if (Player.isInitializedCurrentPlayer) {
					return Player.currentPlayer;
				} else {
					return null;
				}
			}
		}

		public static bool IsInitializedCurrentPlayer {
			get {
				return Player.isInitializedCurrentPlayer;
			}
		}

		public static void initializeCurrentPlayer(Player p) {
			Player.currentPlayer = p;
			Debug.Log ("Player OK");
			Player.isInitializedCurrentPlayer = true;
		}

		public static void initializeCurrentPlayer(int id, string pseudo, string color) {
			Player.currentPlayer = new Player(id, pseudo, color);
			Player.isInitializedCurrentPlayer = true;
		}

		public static void initializeCurrentPlayer(JObject node) {
			Player.currentPlayer = new Player(node);
			Player.isInitializedCurrentPlayer = true;
		}
	}
}

