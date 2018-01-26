using System;
using UnityEditor;
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
		private ColorEnum color;
		private List<Planet> planets;
		private List<Fleet> fleets;

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
			this.color = color;
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();
		}

		public Player (int id, string pseudo, string color)
		{
			this.id = id;
			this.pseudo = pseudo;
			this.color = ColorEnumHelper.ToEnum(color);
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();
		}

		public Player (JObject node)
		{
			this.id = (int) node["id"];
			this.pseudo = (string) node["pseudo"];
			this.color = (ColorEnum) ((int) node["color"]);
			this.fleets = new List<Fleet> ();
			this.planets = new List<Planet> ();
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
			Player.isInitializedCurrentPlayer = true;
			Player.currentPlayer = p;
		}

		public static void initializeCurrentPlayer(int id, string pseudo, string color) {
			Player.isInitializedCurrentPlayer = true;
			Player.currentPlayer = new Player(id, pseudo, color);
		}

		public static void initializeCurrentPlayer(JObject node) {
			Player.isInitializedCurrentPlayer = true;
			Player.currentPlayer = new Player(node);
		}
	}
}

