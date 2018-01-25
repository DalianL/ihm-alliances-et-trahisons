using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Fleet
	{
		private int id;
		private string name;
		private int id_planet;
		private int id_player;

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

		public int Id_planet {
			get {
				return this.id_planet;
			}
			set {
				this.id_planet = value;
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

		public Fleet ()
		{
			new Fleet (0, "", 0, 0);
		}

		public Fleet (int id, string name, int planet, int player)
		{
			this.id = id;
			this.name = name;
			this.id_planet = planet;
			this.id_player = player;
		}

		public Fleet (JObject node)
		{
			this.id = (int) node["id"];
			this.name = (string) node["name"];
			this.id_planet = (int) node["id_planet"];
			this.id_player = (int) node["id_player"];
		}
	}
}

