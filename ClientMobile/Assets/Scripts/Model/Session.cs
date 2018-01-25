using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

namespace AssemblyCSharp
{
	public class Session
	{
		private int id;
		private List<Player> players;
		private List<Planet> planets;
		private List<Fleet> fleets;

		public List<Player> Players {
			get {
				return this.players;
			}
			set {
				this.players = value;
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

		public Player getPlayerById(int id) {
			foreach (Player player in players) {
				if (player.Id == id)
					return player;
			}
			return null;
		}

		public Planet getPlanetById(int id) {
			foreach (Planet planet in planets) {
				if (planet.Id == id)
					return planet;
			}
			return null;
		}
			
		public Session ()
		{
			new Session (0);
		}

		public Session (int id)
		{
			this.id = id;
			this.players = new List<Player> ();
			this.planets = new List<Planet> ();
			this.fleets = new List<Fleet> ();
		}

		public Session (JObject node)
		{
			this.players = new List<Player> ();
			this.planets = new List<Planet> ();
			this.fleets = new List<Fleet> ();

			JArray tmpPlayers = (JArray) node ["players"];
			for(int i = 0; i < tmpPlayers.Count; i++) {
				Player player = new Player ((JObject)tmpPlayers [i]);
				this.players.Add (player);
			}
			JArray tmpPlanets = (JArray) node ["planets"];
			for(int i = 0; i < tmpPlanets.Count; i++) {
				Planet planet = new Planet ((JObject)tmpPlanets [i]);
				this.planets.Add (planet);
				if(planet.Id_player != -1)
					getPlayerById (planet.Id_player).Planets.Add (planet);
			}
			JArray tmpFleets = (JArray) node ["fleets"];
			for(int i = 0; i < tmpFleets.Count; i++) {
				Fleet fleet = new Fleet ((JObject)tmpFleets [i]);
				this.fleets.Add (fleet);
				if(fleet.Id_player != -1)
					getPlayerById (fleet.Id_player).Fleets.Add (fleet);
			}

			Player.initializeCurrentPlayer (getPlayerById ((int) node ["userId"]));
		}


		private static Session currentSession;
		private static bool isInitializedCurrentSession = false;

		public static Session CurrentSession {
			get {
				if (Session.isInitializedCurrentSession) {
					return Session.currentSession;
				} else {
					return null;
				}
			}
		}

		public static bool IsInitializedCurrentSession {
			get {
				return Session.isInitializedCurrentSession;
			}
		}

		public static void initializeCurrentSession(Session s) {
			Session.isInitializedCurrentSession = true;
			Session.currentSession = s;
		}

		public static void initializeCurrentSession(JObject node) {
			Session.isInitializedCurrentSession = true;
			Session.currentSession = new Session(node);
		}
	}
}

