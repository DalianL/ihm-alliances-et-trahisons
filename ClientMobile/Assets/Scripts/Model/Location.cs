using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Location
	{
		private List<int> listX = new List<int> (new int[] {
			230,
			770,
			500,
			1225,
			1710,
			930,
			12,
			234,
			1280,
			658,
			1189,
			1489,
			1520,
			1634,
			1744
		});

		private List<int> listY = new List<int> (new int[] {
			185,
			102,
			810,
			209,
			807,
			822,
			27,
			510,
			590,
			385,
			-20,
			86,
			476,
			226,
			82
		});

		private List<int> listDiameter = new List<int> (new int[] {
			95,
			135,
			110,
			110,
			100,
			220,
			90,
			65,
			180,
			95,
			110,
			85,
			70,
			140,
			60
		});

		private int posX;
		private int posY;
		private int diameter;

		public int PosX {
			get {
				return this.posX;
			}
		}

		public int PosY {
			get {
				return this.posY;
			}
		}

		public int Diameter {
			get {
				return this.diameter;
			}
		}

		public Location ()
		{
			new Location (0);
		}

		public Location (int id)
		{
			this.posX = givePosX (id);
			this.posY = givePosY (id);
			this.diameter = giveDiameter (id);
		}

		private int givePosX(int id)
		{
			if (id < listX.Count)
				return listX [id];
			else
				return 0;
		}

		private int givePosY(int id)
		{
			if (id < listY.Count)
				return listY [id];
			else
				return 0;
		}

		private int giveDiameter(int id)
		{
			if (id < listDiameter.Count)
				return listDiameter [id];
			else
				return 0;
		}
	}
}


