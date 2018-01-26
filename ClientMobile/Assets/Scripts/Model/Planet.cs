using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Planet
	{
		private int id;
		private string name;
		private int id_player;
		private Dictionary<ResourcesEnum, int> resources;

		public int Id {
			get {
				return this.id;
			}
			set {
				this.id = value;
			}
		}

		public string Name {
			get {
				return this.name;
			}
			set {
				this.name = value;
			}
		}

		public int Id_player {
			get {
				return this.id_player;
			}
			set {
				this.id_player = value;
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

		public Planet ()
		{
			new Planet (0, "", 0);
		}

		public Planet (int id, string name, int player)
		{
			this.id = id;
			this.name = name;
			this.id_player = player;
			this.resources = new Dictionary<ResourcesEnum, int> ();
		}

		public Planet (JObject node)
		{
			this.id = (int) node["id"];
			this.name = (string) node["name"];
			this.id_player = (int) node["id_player"];

			this.resources = new Dictionary<ResourcesEnum, int> ();
			JArray nodeResources = (JArray) node ["resources"];
			this.resources[ResourcesEnum.RED_CRYSTAL_KYBER] = (int) nodeResources[0];
			this.resources[ResourcesEnum.GREEN_CRYSTAL_KYBER] = (int) nodeResources[1];
			this.resources[ResourcesEnum.BLUE_CRYSTAL_KYBER] = (int) nodeResources[2];
			this.resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = (int) nodeResources[3];
		}
	}
}

