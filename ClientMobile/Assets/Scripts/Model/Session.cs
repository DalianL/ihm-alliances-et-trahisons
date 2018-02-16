using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace AssemblyCSharp
{
	public class Session
	{
		private int id;
		private long time;
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

		public long Time {
			get {
				return this.time;
			}
			set {
				this.time = value;
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

		public Player giveWinner() {
			int maxPlanet = -1;
			int maxFleet = -1;
			Player winner = new Player();
			for(int i = 0; i < this.players.Count; i++) {
				if(maxPlanet < this.players[i].Planets.Count) {
					maxPlanet = this.players [i].Planets.Count;
					winner = this.players [i];
					maxFleet = this.players [i].Fleets.Count;
				} else if (maxPlanet  == this.players[i].Planets.Count) {
					if(maxFleet < this.players[i].Fleets.Count) {
						maxPlanet = this.players [i].Planets.Count;
						winner = this.players [i];
						maxFleet = this.players [i].Fleets.Count;
					}
				}
			}
			return winner;
		}

		public Player giveWinner(List<Player> list) {
			int maxPlanet = -1;
			int maxFleet = -1;
			Player winner = new Player();
			for(int i = 0; i < list.Count; i++) {
				if(maxPlanet < list[i].Planets.Count) {
					maxPlanet = list [i].Planets.Count;
					winner = list [i];
					maxFleet = list [i].Fleets.Count;
				} else if (maxPlanet  == list[i].Planets.Count) {
					if(maxFleet < list[i].Fleets.Count) {
						maxPlanet = list [i].Planets.Count;
						winner = list [i];
						maxFleet = list [i].Fleets.Count;
					}
				}
			}
			return winner;
		}

		public List<Player> orderPlayer() {
			List<Player> copyList = copyPlayers(players);
			List<Player> finalList = new List<Player> ();
			while (copyList.Count > 0) {
				Player winner = giveWinner (copyList);
				removePlayer(copyList,winner);
				finalList.Add (winner);
			}
			return finalList;
		}

		public void removePlayer(List<Player> list, Player p) {
			for(int i = 0; i < list.Count; i++) {
				if (list[i].Id == p.Id) {
					list.RemoveAt (i);
				}
			}
		}

		public List<Player> copyPlayers(List<Player> list) {
			List<Player> dest = new List<Player> ();
			for(int i = 0; i < list.Count; i++) {
				dest.Add (list[i]);
			}
			return dest;
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
			this.id = 0;
			this.time = 0;

			JArray tmpPlayers = (JArray) node ["players"];
			for(int i = 1; i < tmpPlayers.Count; i++) {
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
			this.time = (long) node ["time"];
			Player.initializeCurrentPlayer (getPlayerById ((int) node ["userId"]));

			Debug.Log ("Session OK");
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
			Session.currentSession = s;
			Session.isInitializedCurrentSession = true;
		}

		public static void initializeCurrentSession(JObject node) {
			Session.currentSession = new Session(node);
			Session.isInitializedCurrentSession = true;
		}
	}
}

